import { Router } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { AiController } from './ai.controller';
import { AiValidation } from './ai.validation';

const router = Router();

router.post(
  '/chat',
  validateRequest(AiValidation.chatValidation),
  AiController.handleChat
);

router.post(
  '/checklist',
  validateRequest(AiValidation.checklistValidation),
  AiController.handleChecklist
);

router.post(
  '/generate-description',
  auth('admin', 'manager'),
  validateRequest(AiValidation.generateDescriptionValidation),
  AiController.handleGenerateDescription
);

router.post(
  '/review-summary',
  auth('admin', 'manager'),
  validateRequest(AiValidation.reviewSummaryValidation),
  AiController.handleReviewSummary
);

export const AiRoutes = router;
