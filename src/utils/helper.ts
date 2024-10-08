import { permissionIds, permissionPrefixes } from './constants';

//Throw Custom error

export function throwError(error: string) {
  throw new Error(`WellthIQ Error : ${error}`);
}

// Check Packages are matching
export function arePackageNamesMatching(packageNames: string[]): boolean {
  if (packageNames.length === 0) {
    return false;
  }

  const frequencyMap: { [key: string]: number } = {};
  packageNames.forEach((name) => {
    frequencyMap[name] = (frequencyMap[name] || 0) + 1;
  });

  let mostFrequentPackage = packageNames?.[0] || '';
  let maxCount = frequencyMap[mostFrequentPackage] || 0;

  for (const [name, count] of Object.entries(frequencyMap)) {
    if (count > maxCount) {
      mostFrequentPackage = name;
      maxCount = count;
    }
  }

  const basePackage = mostFrequentPackage.split('.').slice(0, -1).join('.');
  const regex = new RegExp(`^${basePackage}(\\.|$)`);

  return packageNames.every((packageName) => regex.test(packageName));
}

//set Permission Ranges
export function rangeToString(start: number, end: number): string {
  const array = Array.from({ length: end - start + 1 }, (_, i) =>
    (start + i).toString()
  );
  return array.join(', ');
}

// Check Permission
export function checkPermission(permission: string): boolean {
  if (permissionPrefixes.some((prefix) => permission.startsWith(prefix))) {
    return true;
  }
  const permissionArray = permissionIds.split(', ');
  return permissionArray.some((id) => permission.includes(id));
}
