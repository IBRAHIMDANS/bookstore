export const transformArray = ({ value }) => (typeof value === 'string' ? value.split(',') : value);
