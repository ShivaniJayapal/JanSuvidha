import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Heart, 
  Droplets, 
  IndianRupee, 
  BookOpen, 
  Wheat, 
  Users, 
  Upload,
  FileText,
  GitCompare,
  X
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { t } = useLanguage();

  const menuItems = [
    { id: 'home', icon: Home, label: t('home'), path: '/' },
    { id: 'health', icon: Heart, label: t('health'), path: '/category/health' },
    { id: 'sanitation', icon: Droplets, label: t('sanitation'), path: '/category/sanitation' },
    { id: 'budget', icon: IndianRupee, label: t('budget'), path: '/category/budget' },
    { id: 'education', icon: BookOpen, label: t('education'), path: '/category/education' },
    { id: 'agriculture', icon: Wheat, label: t('agriculture'), path: '/category/agriculture' },
    { id: 'welfare', icon: Users, label: t('welfare'), path: '/category/welfare' },
    { id: 'upload', icon: Upload, label: t('upload'), path: '/upload' },
    { id: 'rti', icon: FileText, label: t('rti'), path: '/rti' },
    { id: 'compare', icon: GitCompare, label: t('compare'), path: '/compare' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 z-30 w-64 h-full bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="text-lg font-semibold text-gray-900">{t('menu')}</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-4 lg:mt-8">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center px-3 py-2 rounded-lg transition-colors duration-150 ease-in-out
                      ${isActive 
                        ? 'bg-gradient-to-r from-orange-100 to-green-100 text-orange-700 border-l-4 border-orange-500' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-orange-600' : 'text-gray-500'}`} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-orange-50 to-green-50 p-4 rounded-lg border border-orange-200">
            <p className="text-sm text-gray-700 mb-2 font-medium">{t('helpTitle')}</p>
            <p className="text-xs text-gray-600">{t('helpText')}</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;