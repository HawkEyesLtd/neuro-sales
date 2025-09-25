export default function labelChange(label) {
    switch (label) {
        case 'CM':
            return 'Merchandiser';
        case 'MS':
            return 'MS';
        case 'CC':
            return 'BA';
        case 'MTCM':
            return 'MTM';
        default:
            return label;
    }
}
