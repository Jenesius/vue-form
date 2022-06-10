export default (v: any) => v === null || v === undefined || Array.isArray(v) || typeof v !== 'object';
