import { createRoot } from 'react-dom/client';
import { IdeaFactory } from './IdeaFactory';
import './styles.css';

// Mounts the experience into any element with id="idea-factory" (the landing page's hero, or the dev page).
const mount = document.getElementById('idea-factory');
if (mount) createRoot(mount).render(<IdeaFactory />);
