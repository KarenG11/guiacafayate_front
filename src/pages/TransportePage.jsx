import { useState, useEffect } from 'react';
import CardEmpresa from '../components/Card/CardEmpresa';
import CategoryFilters from '../components/QuickAccess/CategoryFilters';
import useLugares from '../hooks/useLugares';
import useTipoCategorias from '../hooks/useTipoCategorias';

function TransportePage() {
  const { lugares, loading: loadingLugares, error: errorLugares } = useLugares();
  const { tipoCategorias, loading: loadingTipos } = useTipoCategorias();
  const [lugaresTransporte, setLugaresTransporte] = useState([]);
  const [lugaresPorTipo, setLugaresPorTipo] = useState({});

  const loading = loadingLugares || loadingTipos;
  const error = errorLugares;

  // Función para ordenar por nivel
  const ordenNivel = { oro: 1, plata: 2, bronce: 3, gratis: 4 };
  const ordenarPorNivel = (lugares) => {
    return lugares.sort((a, b) => {
      const nivelA = (a.nivel || a.level || 'gratis').toLowerCase();
      const nivelB = (b.nivel || b.level || 'gratis').toLowerCase();
      return (ordenNivel[nivelA] || 5) - (ordenNivel[nivelB] || 5);
    });
  };

  useEffect(() => {
    if (lugares && lugares.length > 0) {
      // Filtrar lugares que pertenecen a la categoría "Transporte"
      const filtrados = lugares.filter(lugar => {
        const categoriaNombre = lugar.categoria?.nombre || '';
        return categoriaNombre.toLowerCase().includes('transporte');
      });
      
      setLugaresTransporte(filtrados);

      // Agrupar por tipo de categoría
      const agrupados = {};
      
      tipoCategorias.forEach(tipo => {
        const lugaresDelTipo = filtrados.filter(lugar => {
          return lugar.tipo_id === tipo._id || lugar.tipoCategoria === tipo._id;
        });

        if (lugaresDelTipo.length > 0) {
          agrupados[tipo.nombre] = ordenarPorNivel(lugaresDelTipo);
        }
      });

      setLugaresPorTipo(agrupados);
    }
  }, [lugares, tipoCategorias]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader-spinner"></div>
        <p className="loader-text">Cargando transporte...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">⚠️ Error: {error}</p>
      </div>
    );
  }

  const hayAgrupacion = Object.keys(lugaresPorTipo).length > 0;

  return (
    <main className="main-container">
      <CategoryFilters currentCategory="transporte" />

      <section id="transporte" className="section-group">
        <h2 className="section-group-title">Transporte</h2>

        {hayAgrupacion ? (
          Object.entries(lugaresPorTipo).map(([tipo, lugares]) => (
            <div key={tipo} className="section-group-container">
              <h3 className="section-group-subtitle">{tipo}</h3>

              <div className="cards-container">
                {lugares.map(lugar => (
                  <CardEmpresa key={lugar._id} item={lugar} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="section-group-container">
            <div className="cards-container">
              {ordenarPorNivel([...lugaresTransporte]).map(lugar => (
                <CardEmpresa key={lugar._id} item={lugar} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default TransportePage;
