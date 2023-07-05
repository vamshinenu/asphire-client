import { customAlphabet } from "nanoid";

export default function generateId(length?: number) {
    length = length || 16;
    const alphabets = "vijayaammapuppymummu210482"
    return customAlphabet(alphabets, length)();
}