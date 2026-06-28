import { Compass, ShieldCheck, LogOut } from 'lucide-react';

interface NavbarProps {
  isAdminMode: boolean;
  onExitAdmin: () => void;
  onLogoClick: () => void;
}

export default function Navbar({ isAdminMode, onExitAdmin, onLogoClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

        <div className="flex items-center gap-3">
          {isAdminMode ? (
            <button
              onClick={onExitAdmin}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition-all duration-300 hover:bg-emerald-700"
              title="Salir del panel de administración"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Salir del Admin</span>
              <span className="sm:hidden">Salir</span>
            </button>
          ) : (
            <div className="hidden items-center gap-2 rounded-full bg-emerald-50/50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:flex">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Reserva de Confianza 100% Protegida</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}