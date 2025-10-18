import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useChangeRating = ({ id, rate, countOfRating }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newVote) => {
      const newRate = (rate * countOfRating + newVote) / (countOfRating + 1);
      const newCount = countOfRating + 1;

      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: {
            rate: newRate,
            count: newCount,
          },
        }),
      });
      if (!response.ok) {
        throw new Error('ошибка при обновлении рейтинга');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
  return mutation;
};


