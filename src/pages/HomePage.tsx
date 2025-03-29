import { Link } from 'react-router-dom';
import { PRODUCTS_PATH, RECIPES_PATH } from '../routes/paths';

export const HomePage = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">
        Witamy w naszej aplikacji produktów i przepisów
      </h1>
      <p className="text-lg mb-4">
        Zapraszamy do odkrywania szerokiej gamy produktów oraz inspirujących
        przepisów kulinarnych!
      </p>
      <div className="flex justify-center space-x-6">
        <Link
          to={PRODUCTS_PATH}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Przeglądaj produkty
        </Link>
        <Link
          to={RECIPES_PATH}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Przeglądaj przepisy
        </Link>
      </div>
    </div>
  );
};
