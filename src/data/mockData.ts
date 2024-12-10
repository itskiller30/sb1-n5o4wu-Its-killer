import { FileItem } from '../types';

export const mockData: FileItem[] = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    size: 0,
    modified: '2024-03-15T10:00:00'
  },
  {
    id: '2',
    name: 'Project Presentation.pdf',
    type: 'document',
    size: 2500000,
    modified: '2024-03-14T15:30:00'
  },
  {
    id: '3',
    name: 'Vacation Photos',
    type: 'folder',
    size: 0,
    modified: '2024-03-13T09:15:00'
  },
  {
    id: '4',
    name: 'meeting-notes.docx',
    type: 'document',
    size: 150000,
    modified: '2024-03-12T16:45:00'
  },
  {
    id: '5',
    name: 'background-music.mp3',
    type: 'audio',
    size: 5000000,
    modified: '2024-03-11T11:20:00'
  },
  {
    id: '6',
    name: 'project-demo.mp4',
    type: 'video',
    size: 150000000,
    modified: '2024-03-10T14:00:00'
  },
  {
    id: '7',
    name: 'profile-picture.jpg',
    type: 'image',
    size: 750000,
    modified: '2024-03-09T08:30:00'
  },
  {
    id: '8',
    name: 'backup.zip',
    type: 'archive',
    size: 10000000,
    modified: '2024-03-08T17:15:00'
  }
];