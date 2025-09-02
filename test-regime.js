// Simple test script for regime page functionality
const { chromium } = require('playwright');

async function testRegimePage() {
    console.log('🚀 Starting regime page test...');
    
    const browser = await chromium.launch({ headless: false, slowMo: 1000 });
    const page = await browser.newPage();
    
    try {
        // Navigate to the app
        await page.goto('http://localhost:3000'); // Adjust URL as needed
        console.log('✅ Page loaded');
        
        // Wait for the app to load
        await page.waitForSelector('.nav-btn[data-view="regime"]');
        console.log('✅ Navigation buttons found');
        
        // Click regime tab
        await page.click('.nav-btn[data-view="regime"]');
        console.log('✅ Clicked regime tab');
        
        // Wait for regime view to be visible
        await page.waitForSelector('#regime-view.active');
        console.log('✅ Regime view is active');
        
        // Check if body model is visible
        const bodyModel = await page.waitForSelector('.human-body', { timeout: 5000 });
        console.log('✅ Body model SVG is visible');
        
        // Check if nutrients panel is visible
        const nutrientsPanel = await page.waitForSelector('.nutrients-panel', { timeout: 5000 });
        console.log('✅ Nutrients panel is visible');
        
        // Check if category headers are present
        const categoryHeaders = await page.$$('.category-header');
        console.log(`✅ Found ${categoryHeaders.length} category headers`);
        
        if (categoryHeaders.length > 0) {
            // Test expanding a category
            await categoryHeaders[0].click();
            console.log('✅ Clicked first category header');
            
            // Wait for category items to appear
            await page.waitForSelector('.nutrient-item', { timeout: 3000 });
            const nutrientItems = await page.$$('.nutrient-item');
            console.log(`✅ Found ${nutrientItems.length} nutrient items in first category`);
            
            if (nutrientItems.length > 0) {
                // Test hovering over a nutrient item
                await nutrientItems[0].hover();
                console.log('✅ Hovered over first nutrient item');
                
                // Check if add button is present
                const addButton = await nutrientItems[0].$('.add-nutrient-btn');
                if (addButton) {
                    console.log('✅ Add nutrient button found');
                    
                    // Test clicking the add button
                    await addButton.click();
                    console.log('✅ Clicked add nutrient button');
                    
                    // Check if modal opens
                    const modal = await page.waitForSelector('#add-supplement-modal[style*="block"]', { timeout: 3000 });
                    if (modal) {
                        console.log('✅ Modal opened successfully');
                        
                        // Close modal by pressing escape
                        await page.keyboard.press('Escape');
                        console.log('✅ Modal closed with escape key');
                    } else {
                        console.log('⚠️  Modal did not open');
                    }
                }
            }
        }
        
        // Test search functionality
        const searchInput = await page.$('#nutrients-search');
        if (searchInput) {
            await searchInput.fill('vitamin');
            console.log('✅ Typed "vitamin" in search');
            
            // Wait a bit for search to filter
            await page.waitForTimeout(500);
            
            // Check if results are filtered
            const visibleItems = await page.$$('.nutrient-item:not([style*="none"])');
            console.log(`✅ Search filtered to ${visibleItems.length} items`);
            
            // Clear search
            await searchInput.fill('');
            console.log('✅ Cleared search');
        }
        
        // Test body part interactions
        const bodyParts = await page.$$('.body-part');
        console.log(`✅ Found ${bodyParts.length} body parts`);
        
        if (bodyParts.length > 0) {
            await bodyParts[0].click();
            console.log('✅ Clicked first body part');
        }
        
        console.log('🎉 All regime page tests completed successfully!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        await browser.close();
    }
}

// Run the test
testRegimePage().catch(console.error);