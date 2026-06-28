import { Compass, ShieldCheck, Settings, Eye } from 'lucide-react';

interface NavbarProps {
  isAdminMode: boolean;
  onToggleAdminMode: () => void;
  onLogoClick: () => void;
}

export default function Navbar({ isAdminMode, onToggleAdminMode, onLogoClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <button 
          onClick={onLogoClick}
          className="flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 shadow-md shadow-emerald-100">
            <Compass className="h-5.5 w-5.5 text-white" />
          </div>
          <div className="text-left">
            <span className="block text-xl font-extrabold tracking-tight text-slate-900">
              Viaja<span className="text-emerald-500">.cc</span>
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Salidas Cerca de Ti
            </span>
          </div>
        </button>

        {/* Action Controls / Admin Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full bg-emerald-50/50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:flex">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Reserva de Confianza 100% Protegida</span>
          </div>

          <button
            onClick={onToggleAdminMode}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              isAdminMode
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
            title={isAdminMode ? 'Volver al catálogo público' : 'Entrar a panel de administración'}
          >
            {isAdminMode ? (
              <>
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Ver como Viajero</span>
                <span className="sm:hidden">Viajero</span>
              </>
            ) : (
              <>
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Modo Administrador</span>
                <span className="sm:hidden">Admin</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
