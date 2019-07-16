import { extrasConstants  } from '../_constants';

export default function faqs(state = [], action = {}) {
  switch(action.type) {
    case extrasConstants.GET_FAQS:
      return [
        ...state,
        action.faq
      ];
      case extrasConstants.ADD_FAQS:
      return [
        ...state,
        action.faq
      ];
    default: return state;
  }
}
