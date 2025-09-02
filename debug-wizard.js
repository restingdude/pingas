// Debug script to test wizard reset functionality
const { chromium } = require('playwright');

async function testWizardReset() {
    console.log('🚀 Testing wizard reset functionality...');
    
    const browser = await chromium.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();
    
    try {
        // Navigate to the app
        await page.goto('http://localhost:3000');
        console.log('✅ Page loaded');
        
        // Go to regime tab
        await page.click('.nav-btn[data-view="regime"]');
        console.log('✅ Clicked regime tab');
        
        // Test 1: First click should show step 1
        console.log('--- Test 1: First modal open ---');
        await page.click('#add-supplement-btn');
        console.log('✅ Clicked Add Supplement button');
        
        // Wait for modal to appear
        await page.waitForSelector('#add-supplement-modal[style*="block"]');
        
        // Check which step is active
        const activeStep = await page.evaluate(() => {
            const activeSteps = document.querySelectorAll('.wizard-step.active');
            console.log('Active steps found:', activeSteps.length);
            if (activeSteps.length > 0) {
                const step = activeSteps[0];
                console.log('Active step data-step:', step.dataset.step);
                return step.dataset.step;
            }
            return 'none';
        });
        
        console.log(`First open - Active step: ${activeStep}`);
        
        // Close modal
        await page.keyboard.press('Escape');
        console.log('✅ Closed modal with escape');
        
        // Test 2: Second click should also show step 1
        console.log('--- Test 2: Second modal open ---');
        await page.click('#add-supplement-btn');
        console.log('✅ Clicked Add Supplement button again');
        
        await page.waitForSelector('#add-supplement-modal[style*="block"]');
        
        const activeStep2 = await page.evaluate(() => {
            const activeSteps = document.querySelectorAll('.wizard-step.active');
            if (activeSteps.length > 0) {
                return activeSteps[0].dataset.step;
            }
            return 'none';
        });
        
        console.log(`Second open - Active step: ${activeStep2}`);
        
        // Test 3: Navigate to step 4, then close and reopen
        console.log('--- Test 3: Navigate to step 4, then reopen ---');
        
        // Navigate through steps to reach step 4
        for (let i = 1; i < 4; i++) {
            await page.click('#next-step');
            await page.waitForTimeout(100);
        }
        
        // Close modal
        await page.keyboard.press('Escape');
        console.log('✅ Closed modal after navigating to step 4');
        
        // Reopen modal
        await page.click('#add-supplement-btn');
        console.log('✅ Clicked Add Supplement button after step 4');
        
        await page.waitForSelector('#add-supplement-modal[style*="block"]');
        
        const activeStep3 = await page.evaluate(() => {
            const activeSteps = document.querySelectorAll('.wizard-step.active');
            if (activeSteps.length > 0) {
                return activeSteps[0].dataset.step;
            }
            return 'none';
        });
        
        console.log(`Third open (after step 4) - Active step: ${activeStep3}`);
        
        // Summary
        console.log('\n=== RESULTS ===');
        console.log(`First open: Step ${activeStep} ${activeStep === '1' ? '✅' : '❌'}`);
        console.log(`Second open: Step ${activeStep2} ${activeStep2 === '1' ? '✅' : '❌'}`);
        console.log(`After step 4: Step ${activeStep3} ${activeStep3 === '1' ? '✅' : '❌'}`);
        
        if (activeStep === '1' && activeStep2 === '1' && activeStep3 === '1') {
            console.log('🎉 All tests PASSED - Modal always opens on step 1');
        } else {
            console.log('❌ FAILED - Modal not always opening on step 1');
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        await browser.close();
    }
}

// Run the test
testWizardReset().catch(console.error);