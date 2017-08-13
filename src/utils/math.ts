/* Useful mathematical functions */

/**
 * Clamps a number between a given minimum and maximum value
 * @param val the value to clamp
 * @param min the minimum value to clamp val on the lower bounds
 * @param max the maximum value to clamp val on the upper bounds
 * @returns min if val is too low, max if val is too high, otherwise val
 */
export function clamp(val: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, val));
}

/**
 * Checks if two given rectangles overlap
 * @param r1 first rectangle to check
 * @param r2 second rectangle to check
 * @returns true if the two rectangles overlap, false otherwise
 */
export function doRectanglesOverlap(r1: PIXI.Rectangle, r2: PIXI.Rectangle): boolean {
    return !(
        r2.x > (r1.x + r1.width) ||
        (r2.x + r2.width) < r1.x ||
        r2.y > (r1.y + r1.height) ||
        (r2.y + r2.height) < r1.y
    );
}

/**
 * Checks if a circle and a rectangle overlap
 * @param rect the rectangle to check
 * @param circle the circle ro check
 * @returns true if the rectangle and circle overlap, false otherwise
 */
export function doesCircleOverlapRectangle(rect: PIXI.Rectangle, circle: PIXI.Circle): boolean {
    const distX = Math.abs(circle.x - rect.x - rect.width / 2);
    const distY = Math.abs(circle.y - rect.y - rect.height / 2);

    if (distX > (rect.width / 2 + circle.radius) || distY > (rect.height / 2 + circle.radius)) {
        return false;
    }

    if (distX <= (rect.width / 2) || distY <= (rect.height / 2)) {
        return true;
    }

    const dx = distX - rect.width / 2;
    const dy = distY - rect.height / 2;

    return ((dx * dx + dy * dy) <= (circle.radius * circle.radius));
}
