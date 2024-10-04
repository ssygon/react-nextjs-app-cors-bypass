// Format a URL
const formatUrl = (url: string): string => {
  // Remove any number of trailing slashes
  const trimmedUrl = url.replace(/\/+$/, '');
  return `${trimmedUrl}`;
}

// Check if a URL is valid
const isValidUrl = (url: string) => {
  const regex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  const isValid = regex.test( url );
  return isValid;
}

export { formatUrl, isValidUrl };

