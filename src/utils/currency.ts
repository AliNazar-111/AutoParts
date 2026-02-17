/**
 * Currency Utility for Toyota AutoParts
 * Handles USD to PKR conversion and formatting
 */

const USD_TO_PKR_RATE = 1;

/**
 * Converts USD price to PKR
 * @param usdPrice Price in USD
 * @returns Price in PKR
 */
export function convertUsdToPkr(usdPrice: number): number {
    return usdPrice * USD_TO_PKR_RATE;
}

/**
 * Formats a number as PKR currency string
 * @param pkrPrice Price in PKR
 * @returns Formatted string (e.g., "Rs. 25,000")
 */
export function formatPkr(pkrPrice: number): string {
    return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(pkrPrice).replace('PKR', 'Rs.');
}

/**
 * Converts and formats USD price to PKR display string
 * @param usdPrice Price in USD
 * @returns Formatted PKR string
 */
export function displayPriceAsPkr(usdPrice: number): string {
    const pkr = convertUsdToPkr(usdPrice);
    return formatPkr(pkr);
}
