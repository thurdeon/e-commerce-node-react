import { fetchProducts } from "../../util/http.js";
import { useQuery } from '@tanstack/react-query';

const { data, isFetching, error } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts
});

export { data, isFetching, error };
