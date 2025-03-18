
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

export const trackPageView = (pageTitle: string, pagePath: string = window.location.pathname) => {
  logEvent(analytics, 'page_view', {
    page_title: pageTitle,
    page_path: pagePath,
  });
};

export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  logEvent(analytics, eventName, eventParams);
};

export const trackContactFormSubmission = () => {
  logEvent(analytics, 'contact_form_submit');
};

export const trackProjectView = (projectId: string, projectName: string) => {
  logEvent(analytics, 'project_view', {
    project_id: projectId,
    project_name: projectName,
  });
};
