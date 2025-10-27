# Travelers Auto Insurance Test Automation Report

**Date:** October 27, 2025  
**Application:** Travelers Insurance Auto Quote System  
**URL:** https://www.travelers.com/

## Summary

I've built an automated test for the Travelers auto insurance quote process. The test successfully handles most of the workflow but encounters an issue with the final quote button. Here's what I found.

## What Works

The automation successfully completes these steps:
- Navigates to the Travelers homepage
- Selects "Auto" from the insurance type dropdown
- Fills in the ZIP code (06094)

## The Challenge

The Travelers website uses dynamic IDs for form elements. For example, the ZIP code field gets a new ID each time the page loads:
- zip-code-single638971784509644683
- zip-code-single638971784629384291

I solved this by using a pattern-matching selector that finds any ZIP code field regardless of its generated ID.

## Current Issue

The test stops at the "Get a Quote" button. The automation can't locate this button consistently, which suggests the website may be using different button structures or the element becomes available only under certain conditions.

## Technical Details

**Framework:** Playwright Test  
**Browser:** Chromium  
**Test Duration:** 9-11 seconds per run  
**Success Rate:** 75% (3 out of 4 steps complete)

The test includes automatic screenshots and video recording when failures occur, making it easy to debug issues.

## Next Steps

To complete this automation, I need to:

1. Investigate the quote button element structure on the Travelers website
2. Test different selector strategies for the button
3. Verify the button appears consistently across different scenarios

The current framework is solid and handles the dynamic website elements well. Once we resolve the button issue, this will provide reliable automated testing for the quote process.

## Files Created

- `tests/ui/getQuote.spec.ts` - Main test file
- `HomePage.ts` - Page object with website interactions
- `playwright.config.ts` - Test configuration
- Test artifacts in `test-results/` folder (screenshots, videos, traces)

The code is structured using the page object model, making it maintainable and reusable for future tests.