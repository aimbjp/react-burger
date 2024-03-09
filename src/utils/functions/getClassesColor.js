

export default function getClasses(baseClass, isActive) {
    const activeClass = isActive ? 'text_color_primary' : 'text_color_inactive';
    return `${baseClass} ${activeClass}`;
}