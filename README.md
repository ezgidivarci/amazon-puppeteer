# amazon-puppeteer
## Feature: Search product in amazon

	Scenario: Verify result for amazon product search
		Given User visits amazon website
		When User search by product name
		Then Count the results
	  And User clears first search from input
		Then Add a product to the basket
    Then Go to basket screen and check product exists
