import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCategorias from '../../hooks/useCategorias';
import './CategoryFilters.css';

// Mapeo de categorías a sus iconos
const CATEGORIA_ICONS = {
  'Alojamientos': '🏨',
  'Restaurantes': '🍽️',
  'Comercios': '🛍️',
  'Servicios': '⚙️',
  'Transporte': '�',
  'Turismo': '🗺️'
};

function CategoryFilters({ currentCategory }) {
  const { categorias, loading } = useCategorias();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categorias && categorias.length > 0) {
      const mappedCategories = categorias.map((cat) => ({
        id: cat.nombre.toLowerCase(),
        title: cat.nombre,
        icon: CATEGORIA_ICONS[cat.nombre] || '📍',
        to: `/${cat.nombre.toLowerCase()}`
      }));
      
      setCategories(mappedCategories);
    }
  }, [categorias]);

  if (loading || categories.length === 0) {
    return null;
  }

  return (
    <div className="category-filters">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={category.to}
          className={`category-filter ${currentCategory === category.id ? 'active' : ''}`}
        >
          <span className="category-filter-icon">{category.icon}</span>
          <span className="category-filter-title">{category.title}</span>
        </Link>
      ))}
    </div>
  );
}

export default CategoryFilters;
