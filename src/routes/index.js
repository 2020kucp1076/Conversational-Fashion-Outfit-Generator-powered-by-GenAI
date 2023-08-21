
import React from 'react';
import { useRoutes } from 'react-router-dom';
import Index from 'src/pages';
import Onboarding from 'src/pages/onboarding';

export default function Router() {
  return useRoutes([
    {
      path: 'chat',
      element: (
          <Index />
      ),
    },
    {
      path: '/',
      element: (
          <Onboarding/>

      )
    }
  ]);
}
