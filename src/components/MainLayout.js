import React from 'react';
import { Container } from '@mui/material';

import Router from 'src/routes';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';

export default function () {
  return (
    <Container disableGutters={true} position="relative" maxWidth={"700px"}>
      <Layout>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Layout>
    </Container>
  );
}
