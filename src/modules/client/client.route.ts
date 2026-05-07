import { Router } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { ClientController } from './client.controller';
import { 
  createClientValidation, 
  updateClientValidation 
} from './client.validation';

const router = Router();

router.post(
  '/',
  auth('admin', 'manager', 'employee'),
  validateRequest(createClientValidation),
  ClientController.createClient
);

router.get(
  '/',
  auth('admin', 'manager', 'employee'),
  ClientController.getAllClients
);

router.get(
  '/:id',
  auth('admin', 'manager', 'employee'),
  ClientController.getClientById
);

router.patch(
  '/:id',
  auth('admin', 'manager', 'employee'),
  validateRequest(updateClientValidation),
  ClientController.updateClient
);

router.delete(
  '/:id',
  auth('admin', 'manager'),
  ClientController.deleteClient
);

export const ClientRoutes = router;
