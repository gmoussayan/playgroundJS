const {Builder, Browser, By, until} = require('selenium-webdriver');

(async function example(){

    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    try{

    await driver.manage().setTimeouts( { implicit: 30000 } );
    await driver.manage().deleteAllCookies();
    await driver.manage().window().maximize();

    await driver.get("http://timvroom.com/selenium/playground/");

    // 1- Grab page title and place title text in answer slot #1
	let title = await driver.getTitle();
    console.log(title);
	await driver.findElement(By.id("answer1")).sendKeys(title);

    // 2- Fill out name section of form to be Kilgore Trout
	await driver.findElement(By.id("name")).sendKeys("Kilgore Trout");

	// 3- Set occupation on form to Sci-Fi Author
	await driver.findElement(By.css("option[value='scifiauthor']")).click();

	// 4- Count number of blue_boxes on page after form and enter into answer box #4
    var blueBoxes = await driver.findElements(By.css("span[class='bluebox']"));
	let blueBoxesSize =  blueBoxes.length;
    let str2 = blueBoxesSize.toString();
	await driver.findElement(By.id("answer4")).sendKeys(str2);

	// 5- Click link that says 'click me'
	await driver.findElement(By.linkText("click me")).click();

	// 6- Find red box on its page find class applied to it, and enter into answer
	// box #6
	let redBox = await driver.findElement(By.id("redbox"));
	let className = await redBox.getAttribute("class");
	await driver.findElement(By.id("answer6")).sendKeys(className);

    // 7- Run JavaScript function as: ran_this_js_function() from your Selenium
    // script
    await driver.executeScript('ran_this_js_function();');

	// 8- Run JavaScript function as: got_return_from_js_function() from your
	// Selenium script, take returned value and place it in answer slot #8
    let returnedValue = await driver.executeScript('return got_return_from_js_function();');
    let stringValue = returnedValue.toString();
    await driver.findElement(By.id("answer8")).sendKeys(stringValue);

 	// 9- Mark radio button on form for written book? to Yes
 	await driver.findElement(By.css("input[value='wrotebook']")).click();

	// 10- Get the text from the Red Box and place it in answer slot #10
	let redBoxText = await redBox.getText();
	await driver.findElement(By.id("answer10")).sendKeys(redBoxText);

    // 11- Which box is on top? orange or green -- place correct color in answer
    // slot #11
    let element = await driver.findElement(By.xpath("(//script[@type='text/javascript'])[4]"));
    let boxColor = await driver.executeScript('return box_order[0];', element);
    let strBoxColor = boxColor.toString();

    if (boxColor.includes("orange")) {

        await driver.findElement(By.id("answer11")).sendKeys(strBoxColor);

    } else {

        await driver.findElement(By.id("answer11")).sendKeys("green");

    }

    // 12- Set browser width to 850 and height to 650
    await driver.manage().window().setRect({ x: 0, y: 0 });
    await driver.manage().window().setRect({ width: 850, height: 650 });

    // 13- Type into answer slot 13 yes or no depending on whether item by id of
    // ishere is on the page
    let ishereOrNot = (await driver.findElements(By.css("div[id='ishere']"))).length;
    if (ishereOrNot > 0) {

        await driver.findElement(By.id("answer13")).sendKeys("yes");
    }

    else {

        await driver.findElement(By.id("answer13")).sendKeys("no");

    }

    // 14- Type into answer slot 14 yes or no depending on whether item with id of
    // purplebox is visible
    let purpleAvailability = await driver.findElement(By.id("purplebox")).getAttribute("style");
    if (purpleAvailability.includes('none')) {

        await driver.findElement(By.id("answer14")).sendKeys("no");
    } else {

        await driver.findElement(By.id("answer14")).sendKeys("yes");

    };

    // 15- Waiting game: click the link with link text of 'click then wait' a random
    // wait will occur (up to 10 seconds) and then a new link will get added with
    // link text of 'click after wait'
    // click this new link within 500 ms of it appearing to pass this test
    await driver.findElement(By.linkText("click then wait")).click();
    let ele = await driver.wait(until.elementLocated(By.linkText("click after wait")),30000);
    await driver.findElement(By.linkText("click after wait")).click();

    // 16- Click OK on the confirm after completing task 15
    let alert = await driver.switchTo().alert();
    await alert.accept();

    // 17- Click the submit button on the form
    await driver.findElement(By.name("submit")).click();

    // Bonus!- Printing results on console
    await driver.findElement(By.id("checkresults")).click();
    let passedTests = await driver.findElement(By.id("showresults")).getText();
    console.log(passedTests);

    // scroll to bottom DIV
    let bottomDIV = await driver.findElement(By.id("bottom"));
    await driver.executeScript("arguments[0].scrollIntoView()", bottomDIV);

    // scroll back to top
    let topHead = await driver.findElement(By.id("tophead"));
    await driver.executeScript("arguments[0].scrollIntoView()", topHead);

}finally{

    await driver.sleep(5000);
    await driver.quit();

}
    
})();