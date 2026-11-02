// ***********************************************************
// This support file is processed and loaded automatically
// before your component test files.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import { mount } from 'cypress/react';
import '../../styles/globals.css';
import './commands';

Cypress.Commands.add('mount', mount);
