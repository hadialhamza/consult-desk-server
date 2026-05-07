import { Router } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { VisaServiceController } from './visaService.controller';
import { 
  createVisaServiceValidation, 
  updateVisaServiceValidation 
} from './visaService.validation';

const router = Router();

router.post(
  '/',
  auth('admin', 'manager'),
  validateRequest(createVisaServiceValidation),
  VisaServiceController.createVisaService
);

router.get('/', VisaServiceController.getAllVisaServices);

router.get('/:id', VisaServiceController.getVisaServiceById);

router.patch(
  '/:id',
  auth('admin', 'manager'),
  validateRequest(updateVisaServiceValidation),
  VisaServiceController.updateVisaService
);

router.delete(
  '/:id',
  auth('admin', 'manager'),
  VisaServiceController.deleteVisaService
);

export const VisaServiceRoutes = router;
