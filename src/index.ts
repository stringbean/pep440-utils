const VALID_VERSION = /^(?:(\d+)!)?(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:(a|b|rc)(\d+))?(?:\.(\w[\w.]*))?(?:\+([\w.]+))?$/;

export function isValid(v: string): boolean {
  return VALID_VERSION.test(v);
}

export function convertToSemver(v: string): string | undefined {
  const extracted = VALID_VERSION.exec(v);

  if (!extracted) {
    return undefined;
  }

  const [
    _,
    epoch,
    major,
    minor,
    patch,
    preType,
    preVersion,
    postVersion,
    local,
  ] = extracted;

  let output = '';

  if (epoch) {
    output += epoch + '.';
  }

  output += major;

  if (minor) {
    output += '.' + minor;
  }

  if (patch) {
    output += '.' + patch;
  }

  if (preType) {
    output += '-';

    switch (preType) {
      case 'a': {
        output += 'alpha';
        break;
      }

      case 'b': {
        output += 'beta';
        break;
      }

      default: {
        output += preType;
      }
    }

    if (preVersion) {
      output += '.' + preVersion;
    }
  }

  if (postVersion) {
    output += '+' + postVersion.replace(/\./g, '-');
  }

  if (local) {
    if (!postVersion) {
      output += '+';
    }

    output += local.replace(/\./g, '-');
  }

  return output;
}
