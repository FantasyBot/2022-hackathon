აქ დავწერ ჩვენ როგორც გვაქვს გაკეთებული...

Hotel Tonight
სასტუმროების ფასდაკლების საიტი(როგორც ვები, ისე მობაილ ვერსია)
ჩვენს საიტზე რეგისტრირდება ორი სახის მომხმარებელი 1.ჩვეულებრივი იუზერი რომელიც ნახულობს სასტუმროს ფასდაკლებებს(აქვს თავისი გვერდი, დაჯავშნილი, ნაყიდი ვაუჩერები) და 2. სასტუმროს მენეჯერები (ოპერატორები). ოპერატორები რეგისტრირდებიან ამატებენ თავისი პირადობის სურათებს რეგისტრაციისას. მას შემდეგ რაც იდენთიფიცირდება მათი ვინაობა, მათ შეეძლებათ სასტუმროების დამატება(ფასდაკლებები) ან მათი განცხადებების წაშლა. ოპერატორებს ექნებათ წვდომა ინფორმაციაზე მათი სასტუმროს ნაყიდი ვაუჩერების შესახებ, იუზერების შესახებ...(email, fullname)
ჩვეულებრივი იუზერები ნახულობენ სასტუმროს ფასდაკლებებს და წინასწარ არკვევენ სასტუმროსთან სანამ იყიდიან ვაუჩერს, რომ ისარგებლონ ფასდაკლებით. მათ აქვთ წვდომა მათი ნაყიდი ვაუჩერების შესახებ(სასტუმრო, ფასი, საკონტაქტო ინფორმაცია, ღამეების რაოდენობა)

მთავარი პრიორიტეტი swoop.ge სგან ან hotsale.ge სგან განსხვავებით ის არის რომ ჩვენთან შესაძლებელია მაქსიმალურად სწრაფად მოხდეს ფასდაკლებული პროდუქტის 'მიწვდომა' მომხმარებელზე...(Last minute discount)

1. https://hackathon-2022.herokuapp.com/api/product/allhotels ყველა სასტუმრო homepage ზე..
   // Get all hotels
   // GET/api/product/allhotels
   // Public

2. https://hackathon-2022.herokuapp.com/api/user/login როგორც ჩვეულებრივი იუზერის ისე ოპერატორის შესვლა...
   // Auth user & get token
   // POST/api/user/login
   // Public
   ბექში ველოდები ამას - const { email, password } = req.body;

3. https://hackathon-2022.herokuapp.com/api/user/register იუზერის რეგისტრაცია...
   // Register new user
   // POST/api/user/register
   // Public
   ბექში ველოდები ამას - const { fullname, password, email } = req.body;

4. https://hackathon-2022.herokuapp.com/api/user/register/operator სასტუმროს მენეჯერის რეგისტრაცია(ოპერატორი)...
   // Register new operator
   // POST/api/user/register/operator
   // Public
   formdata-თი აგზავნი name, password, email და images(2სურათი, პირადობის წინა და უკანა მხარე...) (შეგიძლიათ registerOperator.js ფეიჯში ჩაიხედოთ...)

5. https://hackathon-2022.herokuapp.com/api/user/profile როგორც იუზერის ისე ოპერატორის პროფაილ გვერდი...
   // Get user profile
   // GET/api/user/profile
   // Private
   ბექში ველოდები ამას - const { email } = req.body;
   ჰედერში შესული იუზერის ტოკენი...

6. https://hackathon-2022.herokuapp.com/api/product/create/hotel ოპერატორი ამატებს სასტუმროს
   // Create new hotel
   // POST/api/product/create/hotel
   // Private
   ჰედერში შესული იუზერის ტოკენი..
   აქაც formdata თი აგზავნი
   name,
   location,
   price,
   discount_price,
   email,
   phone,
   description
   და images (4 სასტუმროს სურათი, ჩაიხედეთ AddHotelPage.js ში)

7. https://hackathon-2022.herokuapp.com/api/product/myhotels ოპერატორი ნახულობს თავის დამატებულ სასტუმროებს
   // Get user's hotels
   // GET/api/product/myhotels
   // Private
   ჰედერში შესული იუზერის ტოკენი...

8. https://hackathon-2022.herokuapp.com/api/product/hotels/:id ყველა სასტუმროს ფეიჯიდან გადადიხარ კონკრეტულ სასტუმროს ფეიჯზე... (:id სვავ სასტუმროს სახელს)
   // Get one hotel by name
   // GET/api/product/hotels/:id
   // Public

9. https://hackathon-2022.herokuapp.com/api/product/hotels/myhotels/:id (id იქნება სასტუმროს სახელი) სასტუმროს წაშლა(ოპერატორები შლიან მხოლოდ თავის დამატებულ სასტუმროებს)
   // Delete one hotel
   // DELETE/api/product/hotels/myhotels/:id
   // Private
   ჰედერში ჩაისეტოს შესული იუზერის ტოკენი...

ჯერჯერობით საკმარისია და დამავატებ აქ კიდევ...
