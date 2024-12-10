import React from 'react';
import { Folder, File, FileText, Image, Music, Video, Archive } from 'lucide-react';
import { FileItem } from '../types';

interface DirectoryListProps {
  items: FileItem[];
  viewMode: 'grid' | 'list';
  darkMode: boolean;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case 'folder':
      return <Folder className="w-6 h-6 text-yellow-500" />;
    case 'image':
      return <Image className="w-6 h-6 text-green-500" />;
    case 'document':
      return <FileText className="w-6 h-6 text-blue-500" />;
    case 'audio':
      return <Music className="w-6 h-6 text-purple-500" />;
    case 'video':
      return <Video className="w-6 h-6 text-red-500" />;
    case 'archive':
      return <Archive className="w-6 h-6 text-orange-500" />;
    default:
      return <File className="w-6 h-6 text-gray-500" />;
  }
};

const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const DirectoryList: React.FC<DirectoryListProps> = ({ items, viewMode, darkMode }) => {
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-lg ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'bg-white hover:bg-gray-50'
            } shadow-sm transition-colors duration-200 cursor-pointer`}
          >
            <div className="flex items-center space-x-3">
              {getFileIcon(item.type)}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.name}
                </p>
                <p className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {item.type !== 'folder' && formatSize(item.size)}
                </p>
              </div>
            </div>
            <div className={`mt-2 text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {formatDate(item.modified)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`rounded-lg ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-sm overflow-hidden`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
          <tr>
            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            } uppercase tracking-wider`}>
              Name
            </th>
            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            } uppercase tracking-wider`}>
              Size
            </th>
            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            } uppercase tracking-wider`}>
              Modified
            </th>
          </tr>
        </thead>
        <tbody className={`divide-y ${
          darkMode ? 'divide-gray-700' : 'divide-gray-200'
        }`}>
          {items.map((item) => (
            <tr key={item.id} className={`hover:${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            } cursor-pointer`}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {getFileIcon(item.type)}
                  <div className="ml-4">
                    <div className={`text-sm font-medium ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-500'
              }`}>
                {item.type !== 'folder' && formatSize(item.size)}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-500'
              }`}>
                {formatDate(item.modified)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DirectoryList;