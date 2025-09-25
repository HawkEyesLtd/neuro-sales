const calculateTravellAllowance = (tta, twd, ld, ab, awd, pd) => {
    const ttas = Math.max(0, (tta / twd) * (twd + awd - (ab + ld + pd)));

    return ttas;
};

export default calculateTravellAllowance;
