import {
  PaginatedResponse,
  PaginationParams,
} from '../../../shared/interfaces/pagination.interface';
import { Clinic } from '../../clinics/interfaces/clinic.interface';
import { Patient } from '../../patients/interfaces/patient.interface';
import { User } from '../../users/interfaces/user.interface';

export interface ImagingOrder {
  id: number;
  status: ImagingOrderStatus;
  orderDate: Date;
  radiographService: RadiographService;
  complementaryService: ComplementaryService;
  tomographyService: TomographyService;
  orthodonticPackage: OrthodonticPackage;
  individualOrthodonticStudy: IndividualOrthodonticStudy;
  reportRequired: boolean;
  studyObjective?: string;
  observations?: string;
  toothNumber?: string;

  user: User;
  userId: number;
  patient: Patient;
  patientId: number;
  clinic: Clinic;
  clinicId: number;
}

export interface ImagingOrderFilterParams extends PaginationParams {}

export type ImagingOrderListResponse = PaginatedResponse<ImagingOrder>;

export enum ImagingOrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

enum RadiographService {
  PANORAMIC_MAXILLARY = 'PANORAMIC_MAXILLARY',
  LATERAL_SKULL = 'LATERAL_SKULL',
  PERIAPICAL_TOMOGRAPHIC = 'PERIAPICAL_TOMOGRAPHIC',
  BITE_WING = 'BITE_WING',
  LATERAL_NASAL_SINUSES = 'LATERAL_NASAL_SINUSES',
  TMJ_MOUTH_OPEN_CLOSED = 'TMJ_MOUTH_OPEN_CLOSED',
  TMJ_MOUTH_OPEN = 'TMJ_MOUTH_OPEN',
  TMJ_MOUTH_CLOSED = 'TMJ_MOUTH_CLOSED',
  ANTEROPOSTERIOR_FRONTAL = 'ANTEROPOSTERIOR_FRONTAL',
  POSTEROANTERIOR_FRONTAL = 'POSTEROANTERIOR_FRONTAL',
  CARPAL = 'CARPAL',
}

enum ComplementaryService {
  BIMAXILLAR_WITH_OCCLUSION = 'BIMAXILLAR_WITH_OCCLUSION',
  MAXILLAR_SUPERIOR = 'MAXILLAR_SUPERIOR',
  MAXILLAR_INFERIOR = 'MAXILLAR_INFERIOR',
  BIMAXILLAR_MODELS = 'BIMAXILLAR_MODELS',
  MAXILLAR_MODELS_SUPERIOR = 'MAXILLAR_MODELS_SUPERIOR',
  MAXILLAR_MODELS_INFERIOR = 'MAXILLAR_MODELS_INFERIOR',
}

enum TomographyService {
  BIMAXILLAR_WITH_ATM_16X12 = 'BIMAXILLAR_WITH_ATM_16X12',
  MAXILLAR_SUPERIOR_8X5 = 'MAXILLAR_SUPERIOR_8X5',
  MAXILLAR_SUPERIOR_10X5 = 'MAXILLAR_SUPERIOR_10X5',
  MAXILLAR_SUPERIOR_12X5 = 'MAXILLAR_SUPERIOR_12X5',
  MAXILLAR_INFERIOR_8X5 = 'MAXILLAR_INFERIOR_8X5',
  MAXILLAR_INFERIOR_10X5 = 'MAXILLAR_INFERIOR_10X5',
  MAXILLAR_INFERIOR_12X5 = 'MAXILLAR_INFERIOR_12X5',
  BIMAXILLAR_8X8 = 'BIMAXILLAR_8X8',
  BIMAXILLAR_10X10 = 'BIMAXILLAR_10X10',
  BIMAXILLAR_12X10 = 'BIMAXILLAR_12X10',
  BIMAXILLAR_16X10 = 'BIMAXILLAR_16X10',
  ENDODONTIC_4X4 = 'ENDODONTIC_4X4',
  ENDODONTIC_5X5 = 'ENDODONTIC_5X5',
  MAXILLOFACIAL_16X17 = 'MAXILLOFACIAL_16X17',
  PARANASAL_SINUSES = 'PARANASAL_SINUSES',
  TMJ_MOUTH_OPEN_CLOSED = 'TMJ_MOUTH_OPEN_CLOSED',
  TMJ_MOUTH_OPEN = 'TMJ_MOUTH_OPEN',
  TMJ_MOUTH_CLOSED = 'TMJ_MOUTH_CLOSED',
  SCAN_FACE = 'SCAN_FACE',
}

enum OrthodonticPackage {
  BASIC_RADIOGRAPHIC = 'BASIC_RADIOGRAPHIC',
  CONVENTIONAL = 'CONVENTIONAL',
  COMPLETE = 'COMPLETE',
  COMPLETE_SPECIAL_PHOTOS = 'COMPLETE_SPECIAL_PHOTOS',
}

enum IndividualOrthodonticStudy {
  CEPHALOMETRY = 'CEPHALOMETRY',
  BASIC_ORTHODONTIC_PHOTOS_9 = 'BASIC_ORTHODONTIC_PHOTOS_9',
  SPECIAL_ORTHODONTIC_PHOTOS_18 = 'SPECIAL_ORTHODONTIC_PHOTOS_18',
  STUDY_MODELS_3D = 'STUDY_MODELS_3D',
  SCAN_3D = 'SCAN_3D',
}
