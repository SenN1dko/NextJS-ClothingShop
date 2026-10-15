"""Тесты конфигурации и безопасности."""

import pytest

from core.security import (
    create_access_token,
    decode_token,
    hash_password,
    verify_password,
)
from core.settings import DEV_SECRET_KEY, Settings
from core.utils import slugify


class TestProdConfig:
    def test_rejects_default_secret_key(self) -> None:
        settings = Settings(
            environment="prod",
            auth={"secret_key": DEV_SECRET_KEY},
        )

        with pytest.raises(RuntimeError, match="SECRET_KEY"):
            settings.validate_runtime()

    def test_rejects_short_secret_key(self) -> None:
        settings = Settings(
            environment="prod",
            auth={"secret_key": "short"},
        )

        with pytest.raises(RuntimeError, match="32"):
            settings.validate_runtime()

    def test_rejects_reload_in_prod(self) -> None:
        settings = Settings(
            environment="prod",
            reload=True,
            auth={"secret_key": "a" * 64},
        )

        with pytest.raises(RuntimeError, match="RELOAD"):
            settings.validate_runtime()

    def test_accepts_correct_prod_config(self) -> None:
        settings = Settings(
            environment="prod",
            reload=False,
            db={"echo": False},
            auth={"secret_key": "a" * 64},
        )

        settings.validate_runtime()

    def test_dev_skips_validation(self) -> None:
        Settings(environment="dev").validate_runtime()

    def test_password_is_secret(self) -> None:
        settings = Settings(db={"password": "super-secret"})

        dumped = str(settings.model_dump())
        assert "super-secret" not in dumped

    def test_docs_enabled_in_dev(self) -> None:
        from main import create_app

        assert create_app().docs_url == "/docs"


class TestPasswordHashing:
    def test_hash_is_not_plaintext(self) -> None:
        hashed = hash_password("pass1234")

        assert "pass1234" not in hashed
        assert hashed.startswith("$argon2")

    def test_verify_accepts_correct_password(self) -> None:
        hashed = hash_password("pass1234")

        assert verify_password("pass1234", hashed) is True

    def test_verify_rejects_wrong_password(self) -> None:
        hashed = hash_password("pass1234")

        assert verify_password("wrong", hashed) is False

    def test_verify_rejects_malformed_hash(self) -> None:
        assert verify_password("pass1234", "not-a-hash") is False

    def test_hashes_are_salted(self) -> None:
        assert hash_password("pass1234") != hash_password("pass1234")


class TestTokens:
    def test_access_token_roundtrip(self) -> None:
        token = create_access_token(42)

        assert decode_token(token, expected_type="access") == 42

    def test_refresh_token_is_not_accepted_as_access(self) -> None:
        from core.security import create_refresh_token

        token = create_refresh_token(42)

        assert decode_token(token, expected_type="access") is None

    def test_garbage_token_returns_none(self) -> None:
        assert decode_token("garbage", expected_type="access") is None

    def test_token_signed_with_other_key_rejected(self) -> None:
        import jwt

        token = jwt.encode(
            {"sub": "1", "type": "access", "exp": 9999999999, "iat": 0},
            "another-secret-that-is-long-enough-for-sha256",
            algorithm="HS256",
        )

        assert decode_token(token, expected_type="access") is None


class TestSlugify:
    @pytest.mark.parametrize(
        ("raw", "expected"),
        [
            ("Новый Худи", "novyy-hudi"),
            ("Джинсы прямого кроя", "dzhinsy-pryamogo-kroya"),
            ("  Много   пробелов  ", "mnogo-probelov"),
            ("Hello, World!", "hello-world"),
            ("Уже-slug", "uzhe-slug"),
            ("!!!", ""),
        ],
    )
    def test_slugify(self, raw: str, expected: str) -> None:
        assert slugify(raw) == expected

    def test_slug_has_no_double_dashes(self) -> None:
        assert "--" not in slugify("а --- б")
