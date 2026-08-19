import React, { useEffect } from 'react';
import { usePartnerStore } from '../store/partnerStore';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { partners, fetchPartners } = usePartnerStore();

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const partnersWithTheme = partners.filter(p => p.theme && p.theme.font && p.theme.colors).length;

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 dark:from-blue-900 dark:via-purple-900 dark:to-gray-900 rounded-2xl shadow-2xl p-8 text-white transition-colors duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <span className="text-2xl">👋</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-1">Welcome to Theme Portal</h1>
              <p className="text-blue-100 dark:text-blue-200 text-lg">
                Centraliza y gestiona temas desde <a href="https://lola-framweork-ui.vercel.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors font-semibold">lola-framework-ui Storybook</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/partners" className="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg hover:shadow-2xl p-6 text-white transition-all duration-300 hover:scale-[1.02] border border-blue-400/50">
          <div className="flex items-start justify-between mb-4">
            <div className="text-5xl group-hover:scale-110 transition-transform">🤝</div>
            <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold mb-2">{partners.length}</h2>
          <p className="text-blue-100 font-medium">Total Partners</p>
        </Link>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white border border-green-400/50 hover:scale-[1.02] transition-transform">
          <div className="flex items-start justify-between mb-4">
            <div className="text-5xl">🎨</div>
            <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse" />
          </div>
          <h2 className="text-4xl font-bold mb-2">{partnersWithTheme}</h2>
          <p className="text-green-100 font-medium">Partners con Tema</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white border border-purple-400/50 hover:scale-[1.02] transition-transform">
          <div className="flex items-start justify-between mb-4">
            <div className="text-5xl">✅</div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-100" />
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-200" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-2">Active</h2>
          <p className="text-purple-100 font-medium">System Status</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Flujo de Trabajo</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="group flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent hover:from-blue-100 dark:hover:from-blue-900/30 transition-all">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform">
              1
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                Configura tu tema en el Storybook
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Ve a <a href="https://lola-framweork-ui.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">lola-framework-ui</a> y personaliza colores, fuentes y estilos visualmente</p>
            </div>
          </div>
          <div className="group flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent hover:from-green-100 dark:hover:from-green-900/30 transition-all">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform">
              2
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                Copia el JSON del tema
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                  <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                </svg>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">En la sección "Importar tema desde JSON", copia todo el JSON generado</p>
            </div>
          </div>
          <div className="group flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent hover:from-purple-100 dark:hover:from-purple-900/30 transition-all">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform">
              3
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                Crea/edita tu Partner aquí
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Pega el JSON en el formulario del Partner. El tema se asociará automáticamente</p>
            </div>
          </div>
          <div className="group flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-transparent dark:from-pink-900/20 dark:to-transparent hover:from-pink-100 dark:hover:from-pink-900/30 transition-all">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform">
              4
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                Tu app consume el tema
                <svg className="w-4 h-4 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <code className="px-3 py-1 bg-gray-900 dark:bg-gray-950 text-green-400 text-xs rounded-lg font-mono font-semibold">
                  GET /api/public/themes/:partnerId
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quick Actions</h2>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/partners"
            className="group flex items-center gap-4 p-5 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent dark:hover:from-blue-900/20 dark:hover:to-transparent transition-all hover:shadow-md"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <span className="text-2xl">➕</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Create New Partner</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Agrega un partner con su tema</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <a
            href="https://lola-framweork-ui.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-400 dark:hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-transparent dark:hover:from-purple-900/20 dark:hover:to-transparent transition-all hover:shadow-md"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <span className="text-2xl">🎨</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Open Storybook</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Configura temas visualmente</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        </div>
      </div>

      {partners.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Partners</h2>
            </div>
          </div>
          <div className="p-6 space-y-3">
            {partners.slice(0, 5).map((partner) => (
              <div
                key={partner._id}
                className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  {partner.logo?.value && (
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-600 shadow-sm group-hover:shadow-md transition-shadow overflow-hidden">
                      <img
                        src={partner.logo.type === 'url' ? partner.logo.value : `${import.meta.env.VITE_API_URL.replace('/api', '')}${partner.logo.value}`}
                        alt={partner.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{partner.name}</h3>
                    <p className="text-sm font-mono text-gray-500 dark:text-gray-400">{partner.partnerId}</p>
                  </div>
                </div>
                {partner.theme && partner.theme.font && partner.theme.colors ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Theme
                  </div>
                ) : (
                  <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-600">
                    No theme
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
