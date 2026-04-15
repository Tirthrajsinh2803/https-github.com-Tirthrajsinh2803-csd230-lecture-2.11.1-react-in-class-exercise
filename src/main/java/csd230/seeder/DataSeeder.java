package csd230.seeder;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import csd230.entities.BookEntity;
import csd230.entities.MagazineEntity;
import csd230.entities.UserEntity;
import csd230.repositories.BookRepository;
import csd230.repositories.MagazineRepository;
import csd230.repositories.UserRepository;

@Component
public class DataSeeder implements CommandLineRunner {
    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(BookRepository bookRepository,
                      MagazineRepository magazineRepository,
                      UserRepository userRepository,
                      PasswordEncoder passwordEncoder) {
        this.bookRepository = bookRepository;
        this.magazineRepository = magazineRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedBooks();
        seedMagazines();
    }

   private void seedUsers() {
    userRepository.deleteAll();

    UserEntity admin = new UserEntity();
    admin.setUsername("admin");
    admin.setPassword(passwordEncoder.encode("admin123"));
    admin.setRole("ROLE_ADMIN");
    userRepository.save(admin);

    UserEntity user = new UserEntity();
    user.setUsername("user");
    user.setPassword(passwordEncoder.encode("user123"));
    user.setRole("ROLE_USER");
    userRepository.save(user);
}

    private void seedBooks() {
        if (bookRepository.count() > 0) return;

        List<BookEntity> books = List.of(
                createBook("Clean Code", "Robert C. Martin", 42.99, 8),
                createBook("The Pragmatic Programmer", "Andrew Hunt", 39.99, 6),
                createBook("Design Patterns", "Erich Gamma", 49.99, 5),
                createBook("Refactoring", "Martin Fowler", 44.99, 7),
                createBook("Spring in Action", "Craig Walls", 46.50, 9),
                createBook("Java Concurrency in Practice", "Brian Goetz", 51.25, 4),
                createBook("Head First Design Patterns", "Eric Freeman", 36.75, 10),
                createBook("Effective Java", "Joshua Bloch", 47.80, 11),
                createBook("Eloquent JavaScript", "Marijn Haverbeke", 31.40, 12),
                createBook("The Clean Coder", "Robert C. Martin", 34.20, 6),
                createBook("Computer Networking", "James Kurose", 55.99, 5),
                createBook("Introduction to Algorithms", "Thomas H. Cormen", 68.00, 3)
        );

        bookRepository.saveAll(books);
    }

    private void seedMagazines() {
        if (magazineRepository.count() > 0) return;

        List<MagazineEntity> magazines = List.of(
                createMagazine("AI Monthly", 12.99, 20, 30, LocalDateTime.now().minusDays(3)),
                createMagazine("Cloud Weekly", 9.50, 18, 26, LocalDateTime.now().minusDays(7)),
                createMagazine("Frontend Focus", 11.25, 16, 20, LocalDateTime.now().minusDays(10)),
                createMagazine("Cyber Defense Review", 13.40, 14, 18, LocalDateTime.now().minusDays(14)),
                createMagazine("Data Science Digest", 10.75, 19, 24, LocalDateTime.now().minusDays(17)),
                createMagazine("Startup Product Journal", 8.99, 15, 22, LocalDateTime.now().minusDays(21)),
                createMagazine("DevOps World", 12.10, 13, 17, LocalDateTime.now().minusDays(25)),
                createMagazine("Mobile Builder", 9.95, 12, 16, LocalDateTime.now().minusDays(28))
        );

        magazineRepository.saveAll(magazines);
    }

    private BookEntity createBook(String title, String author, double price, int copies) {
        BookEntity book = new BookEntity();
        book.setTitle(title);
        book.setAuthor(author);
        book.setPrice(price);
        book.setCopies(copies);
        return book;
    }

    private MagazineEntity createMagazine(String title, double price, int copies, int orderQty, LocalDateTime currentIssue) {
        MagazineEntity magazine = new MagazineEntity();
        magazine.setTitle(title);
        magazine.setPrice(price);
        magazine.setCopies(copies);
        magazine.setOrderQty(orderQty);
        magazine.setCurrentIssue(currentIssue);
        return magazine;
    }
}
