export function getTypeLabel(type) {
  switch (type) {
    case 0:
      return "سازمانی";
    case 1:
      return "شهروند";
    default:
      return "-";
  }
}

export function getStatusLabel(status) {
  if (status === 1 || status === "1") {
    return "فعال";
  }
  if (status === 0 || status === "0") {
    return "غیرفعال";
  }
  return "-";
}

export function getTwoFactorLabel(twofactor) {
  if (twofactor === true || twofactor === 1 || twofactor === "1") return "فعال";
  if (twofactor === false || twofactor === 0 || twofactor === "0") return "غیرفعال";
  return "-";
}
