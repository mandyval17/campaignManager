import { TFieldFilter, TFilters } from '@components/types/models/primereactFilters.model';
import { TTableTemplate } from '@components/types/models/tableTemplate.model';

function getLocalISOString(date: Date) {
  const offset = date.getTimezoneOffset(); // Get offset in minutes
  const localDate = new Date(date.getTime() - offset * 60000); // Adjust for local time
  // return localDate.toISOString().replace("Z", ""); // Remove "Z" to indicate it's local
  return localDate.toISOString();
}

export function formattedFilters(e: TFilters, columns: TTableTemplate['columns']): TFilters {
  const sc = structuredClone(e);
  const updatedFilters = sc.filters;

  Object.keys(updatedFilters).forEach((field) => {
    if (field !== 'global' && columns[field]?.type === 'date') {
      const fieldFilter = updatedFilters[field] as TFieldFilter;
      fieldFilter.constraints.forEach((constraint) => {
        if (constraint.value instanceof Date) {
          constraint.value = getLocalISOString(constraint.value);
        }
      });
    }
  });

  return sc;
}
