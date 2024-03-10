export default function getClasses(baseClass: string, isActive: boolean) {
    const activeClass = isActive ? 'text_color_primary' : 'text_color_inactive';
    return `${baseClass} ${activeClass}`;
}