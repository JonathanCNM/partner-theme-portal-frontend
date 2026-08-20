import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Partner } from '../../types/Partner';
import { Button } from '../common/Button';
import { themeVersionService } from '../../services/themeVersionService';

interface PartnerCardProps {
  partner: Partner;
  onEdit: (partner: Partner) => void;
  onDelete: (partner: Partner) => void;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
  partner,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [versionCount, setVersionCount] = useState<number>(0);
  
  const logoUrl = partner.logo?.type === 'url' 
    ? partner.logo.value 
    : partner.logo?.value 
    ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${partner.logo.value}`
    : null;

  const hasTheme = partner.theme && partner.theme.font && partner.theme.colors;
  const figmaCount = partner.figmaLinks?.length || 0;

  // Obtener el conteo de versiones si el partner tiene tema
  useEffect(() => {
    const fetchVersionCount = async () => {
      if (hasTheme && partner._id) {
        try {
          const versions = await themeVersionService.getVersions(partner._id);
          setVersionCount(versions.length);
        } catch (error) {
          console.error('Error fetching version count:', error);
          setVersionCount(0);
        }
      }
    };
    
    fetchVersionCount();
  }, [partner._id, hasTheme]);

  const handleDownloadTheme = () => {
    if (!hasTheme || !partner.theme) return;

    const themeJSON: any = {
      font: partner.theme.font,
      colors: partner.theme.colors,
    };

    if (partner.theme.styles) {
      themeJSON.styles = partner.theme.styles;
    }

    const blob = new Blob([JSON.stringify(themeJSON, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-${partner.partnerId}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleViewDemo = () => {
    if (!hasTheme || !partner.theme) return;

    // Construir el objeto de tema completo
    const theme = {
      font: partner.theme.font,
      colors: partner.theme.colors,
      ...(partner.theme.styles && { styles: partner.theme.styles }),
    };

    // Determinar el host según el entorno
    const location = window.location.hostname;
    const vercelHost = 'https://lola-framweork-ui-demo.vercel.app/';
    const localHost = 'http://localhost:5176/';
    const host = location.includes('localhost') ? localHost : vercelHost;

    // Abrir la ventana de demo
    const child = window.open(host, '_blank');

    // Función para enviar el mensaje
    const sendMessage = () => {
      if (!child) return;
      child.postMessage(
        {
          type: 'storybook-config',
          payload: theme,
        },
        host
      );
    };

    // Intentar enviar el mensaje cada 500ms hasta que la ventana esté lista
    const interval = setInterval(() => {
      if (child && !child.closed) {
        sendMessage();
        clearInterval(interval);
      }
    }, 500);

    // Limpiar el intervalo después de 10 segundos si no se pudo enviar
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 overflow-hidden flex flex-col h-full">
      <div className="relative flex-1 flex flex-col">
        {hasTheme && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-400/20 dark:from-green-500/30 to-transparent rounded-bl-[100px] pointer-events-none" />
        )}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start gap-4 mb-4">
            {logoUrl && (
              <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  src={logoUrl}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain p-2"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {partner.name}
              </h3>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <span className="text-xs font-mono text-gray-600 dark:text-gray-400">ID:</span>
                <span className="text-xs font-mono font-semibold text-gray-900 dark:text-white">{partner.partnerId}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap mb-4">
            {hasTheme ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Theme Configured
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                No Theme
              </div>
            )}
            {figmaCount > 0 && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {figmaCount} Design{figmaCount === 1 ? '' : 's'}
              </div>
            )}
          </div>
          {figmaCount > 0 && (
            <div className="mb-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Figma Designs</p>
              </div>
              <div className="space-y-2">
                {partner.figmaLinks?.slice(0, 3).map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-2 px-3 py-2 text-sm bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all"
                  >
                    <svg className="w-4 h-4 text-purple-500 dark:text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    <span className="font-medium text-purple-700 dark:text-purple-300 group-hover/link:text-purple-900 dark:group-hover/link:text-purple-200 truncate">
                      {link.productName}
                    </span>
                  </a>
                ))}
                {figmaCount > 3 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 pl-3 font-medium">+ {figmaCount - 3} more design{figmaCount - 3 === 1 ? '' : 's'}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Spacer para empujar botones hacia abajo */}
          <div className="flex-1"></div>
          
          <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
            {hasTheme && (
              <>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleViewDemo}
                    className="flex-1 !bg-gradient-to-r !from-purple-50 !to-pink-50 dark:!from-purple-900/40 dark:!to-pink-900/40 hover:!from-purple-100 hover:!to-pink-100 dark:hover:!from-purple-900/60 dark:hover:!to-pink-900/60 !text-purple-700 dark:!text-purple-200 font-semibold !border !border-purple-200 dark:!border-purple-600 hover:!border-purple-300 dark:hover:!border-purple-500"
                  >
                    <svg className="w-4 h-4 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    View Demo
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleDownloadTheme}
                    className="flex-1 !bg-gradient-to-r !from-blue-50 !to-indigo-50 dark:!from-blue-900/40 dark:!to-indigo-900/40 hover:!from-blue-100 hover:!to-indigo-100 dark:hover:!from-blue-900/60 dark:hover:!to-indigo-900/60 !text-blue-700 dark:!text-blue-200 font-semibold !border !border-blue-200 dark:!border-blue-600 hover:!border-blue-300 dark:hover:!border-blue-500"
                  >
                    <svg className="w-4 h-4 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download
                  </Button>
                </div>
                {versionCount > 1 && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/partners/${partner._id}/theme-history`)}
                    className="w-full !bg-gradient-to-r !from-orange-50 !to-amber-50 dark:!from-orange-900/40 dark:!to-amber-900/40 hover:!from-orange-100 hover:!to-amber-100 dark:hover:!from-orange-900/60 dark:hover:!to-amber-900/60 !text-orange-700 dark:!text-orange-200 font-semibold !border !border-orange-200 dark:!border-orange-600 hover:!border-orange-300 dark:hover:!border-orange-500"
                  >
                    <svg className="w-4 h-4 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    View History ({versionCount} versions)
                  </Button>
                )}
              </>
            )}
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit(partner)}
                className="flex-1 font-semibold"
              >
                <svg className="w-4 h-4 inline-block mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(partner)}
                className="flex-1 font-semibold"
              >
                <svg className="w-4 h-4 inline-block mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
