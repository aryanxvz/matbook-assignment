import { Router, type Request, type Response } from 'express';
import { dataStore } from '../store/dataStore.js';
import { FormValidator } from '../utils/validator.js';
import { employeeOnboardingSchema } from '../schema/formSchema.js';

const router = Router();
const formValidator = new FormValidator(employeeOnboardingSchema);

router.get('/form-schema', (req: Request, res: Response) => {
  res.json(employeeOnboardingSchema);
});

router.post('/submissions', (req: Request, res: Response) => {
  const formData = req.body;

  const { valid, errors } = formValidator.validate(formData);

  if (!valid) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  const submission = dataStore.addSubmission(formData);

  res.status(201).json({
    success: true,
    id: submission.id,
    createdAt: submission.createdAt
  });
});

router.get('/submissions', (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
  const sortBy = (req.query.sortBy as string) || 'createdAt';
  const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';

  if (sortBy !== 'createdAt') {
    return res.status(400).json({
      success: false,
      error: 'Invalid sortBy parameter. Only "createdAt" is supported.'
    });
  }

  if (sortOrder !== 'asc' && sortOrder !== 'desc') {
    return res.status(400).json({
      success: false,
      error: 'Invalid sortOrder parameter. Must be "asc" or "desc".'
    });
  }

  const result = dataStore.getSubmissions(page, limit, sortBy, sortOrder);

  res.json({
    success: true,
    data: result.submissions,
    pagination: {
      page: result.page,
      limit,
      total: result.total,
      totalPages: result.totalPages
    }
  });
});

router.get('/submissions/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({
      success: false,
      error: 'Submission ID is required'
    });
  }
  
  const submission = dataStore.getSubmissionById(id);

  if (!submission) {
    return res.status(404).json({
      success: false,
      error: 'Submission not found'
    });
  }

  res.json({
    success: true,
    data: submission
  });
});

export default router;
