Hotel Midnight

1.  https://hackathon-2022.herokuapp.com/api/product/allhotels ყველა სასტუმრო homepage ზე..
    // Get all hotels
    // GET/api/product/allhotels
    // Public

2.  https://hackathon-2022.herokuapp.com/api/user/login როგორც ჩვეულებრივი იუზერის ისე ოპერატორის შესვლა...
    // Auth user & get token
    // POST/api/user/login
    // Public
    ბექში ველოდები ამას - const { email, password } = req.body;

3.  https://hackathon-2022.herokuapp.com/api/user/register ახალი იუზერის, როგორც ოპერატორი ისე ჩვეულებრივი იუზერის რეგისტრაცია (sign up ფორმში იქნება checkbox თუ მონიშნულია - checked=true თუ არა checked=false)
    // Register new user
    // POST/api/user/register
    // Public
    ბექში ველოდები ამათ - const { fullname, password, email, checked } = req.body;

4.  https://hackathon-2022.herokuapp.com/api/user/profile როგორც იუზერის ისე ოპერატორის პროფაილ გვერდი...
    // Get user profile
    // GET/api/user/profile
    // Private
    ბექში ველოდები ამას - const { email } = req.body;
    ჰედერში შესული იუზერის ტოკენი...

5.  https://hackathon-2022.herokuapp.com/api/product/create/hotel ოპერატორი ამატებს სასტუმროს
    // Create new hotel
    // POST/api/product/create/hotel
    // Private
    ბექში აგზავნი ამათ
    const {
    name,
    location,
    city,
    latitude,
    longitude,
    price,
    discount_price,
    email,
    phone,
    description,
    image1,
    image2,
    image3,
    image4,
    } = req.body;
    სურათები იქნება base64 ში სტრინგები...
    react-places-autocomplete გამოვიყენეთ (ჩაიხედეთ addHotelPage ში)
    ჰედერში შესული იუზერის ტოკენი..

6.  https://hackathon-2022.herokuapp.com/api/product/myhotels ოპერატორი ნახულობს თავის დამატებულ სასტუმროებს
    // Get user's hotels
    // GET/api/product/myhotels
    // Private
    ჰედერში შესული იუზერის ტოკენი...

7.  https://hackathon-2022.herokuapp.com/api/product/hotels/:id ყველა სასტუმროს ფეიჯიდან გადადიხარ კონკრეტულ სასტუმროს ფეიჯზე... (:id სვავ სასტუმროს სახელს)
    // Get one hotel by name
    // GET/api/product/hotels/:id
    // Public

8.  https://hackathon-2022.herokuapp.com/api/product/hotels/myhotels/:id (id იქნება სასტუმროს სახელი) სასტუმროს წაშლა(ოპერატორები შლიან მხოლოდ თავის დამატებულ სასტუმროებს)
    // Delete one hotel
    // DELETE/api/product/hotels/myhotels/:id
    // Private
    ჰედერში ჩაისეტოს შესული იუზერის ტოკენი...

9.  https://hackathon-2022.herokuapp.com/api/user/profile იუზერი აანფდეითებს თავის ინფორმაციას (fullname, email, password) იგზავნება ინფო ფრონტიდან როგორ post რექვესტია...
    // Update user profile
    // Put/api/user/profile
    // Private
    დაბრუნებილი ტოკენი ჩაისეტოს თავიდან...
    ჰედერში ჩაისეტოს შესული იუზერის ტოკენი...

10. https://hackathon-2022.herokuapp.com/api/order/save/reservation
    ბექში ველოდები (name სასტუმროს სახელი, location, price, discount_price, email სასტუმროს იმეილი, phone, description, first_photo, nights_in_hotel, voucher_price)
    // Save reservation info in reservations table
    // POST/api/order/save/reservation
    // Private
    ჰედერში ჩაისეტოს შესული იუზერის ტოკენი...

11. https://hackathon-2022.herokuapp.com/api/order/hotel/reservations
    გამოუჩნდეს სასტუმროს ოპერატორს ჯავშნები, მხოლოდ მის მიერ დამატებულ სასტუმროებზე
    // Display hotel reservation for operator
    // GET/api/order/hotel/reservations
    // Private
    ჰედერში ჩაისეტოს შესული იუზერის ტოკენი...

12. https://hackathon-2022.herokuapp.com/api/order/hotel/user/reservations
    გამოუჩნდეს მომხმარებელს, იუზერს, მის მიერ დაჯავშნილი (ნაყიდი ვაუჩერები) სასტუმროები...
    // Display hotel reservation for user
    // GET/api/order/hotel/user/reservations
    // Private
    ჰედერში ჩაისეტოს შესული იუზერის ტოკენი...

13. https://hackathon-2022.herokuapp.com/api/product/allhotels/filteredbycity ყველა სასტუმრო homepage ზე..
    // Get all hotels filtered by city
    // GET/api/product/allhotels/filteredbycity
    // Public

ჯერჯერობით საკმარისია და დროდადრო დაემატება კიდევ...
