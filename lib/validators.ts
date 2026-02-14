import { FeatureFormData } from '@/types/spec';

export function validateFeatureForm(data: Partial<FeatureFormData>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Feature title is required');
  }

  if (!data.goal || data.goal.trim().length === 0) {
    errors.push('Goal is required');
  }

  if (!data.users || data.users.trim().length === 0) {
    errors.push('Target users is required');
  }

  if (!data.constraints || data.constraints.trim().length === 0) {
    errors.push('Constraints is required');
  }

  if (!data.templateType) {
    errors.push('Template type is required');
  } else if (!['Web App', 'Mobile App', 'Internal Tool'].includes(data.templateType)) {
    errors.push('Invalid template type');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
