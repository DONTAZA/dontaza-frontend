import type { ApiError } from '@/types/api'

const ERROR_MESSAGES: Record<string, string> = {
  S01: '서버에 문제가 발생했어요. 잠시 후 다시 시도해주세요',
  G01: '요청한 항목을 찾을 수 없어요',
  G02: '지원하지 않는 요청이에요',
  G03: '이미 존재하는 항목이에요',
  G04: '입력값을 확인해주세요',
  M01: '회원 정보를 찾을 수 없어요',
  ST01: '주변 대여소를 찾을 수 없어요',
  ST02: '50m 이내에 대여소가 없어요',
  R01: '이미 라이딩이 진행 중이에요',
  R02: '라이딩 세션을 찾을 수 없어요',
  R03: '대여 검증이 완료되지 않았어요',
  R04: '이미 종료된 라이딩이에요',
  R05: '최소 5분 이상 라이딩해야 해요',
  R06: '오늘은 이미 라이딩을 완료했어요',
  A01: '로그인이 만료되었어요. 다시 로그인해주세요',
  A02: '로그인이 필요해요',
  A03: '카카오 인증에 실패했어요',
  I01: '외부 서비스 처리에 실패했어요',
}

const DEFAULT_MESSAGE = '요청을 처리하지 못했어요. 잠시 후 다시 시도해주세요'

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as ApiError).status === 'number'
  )
}

export function getErrorMessage(error: unknown): string {
  if (!isApiError(error)) return DEFAULT_MESSAGE
  if (error.code && ERROR_MESSAGES[error.code]) return ERROR_MESSAGES[error.code]
  return error.message || DEFAULT_MESSAGE
}
