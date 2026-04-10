package csd230.seeder;

import csd230.entities.BookEntity;
import csd230.entities.MagazineEntity;
import csd230.entities.UserEntity;
import csd230.repositories.BookRepository;
import csd230.repositories.MagazineRepository;
import csd230.repositories.UserRepository;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@Component
public class DataSeeder implements CommandLineRunner {
    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Faker faker = new Faker();

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
        if (userRepository.count() > 0) {
            return;
        }

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
        if (bookRepository.count() > 0) {
            return;
        }

        for (int i = 0; i < 10; i++) {
            BookEntity book = new BookEntity();
            book.setTitle(faker.book().title());
            book.setAuthor(faker.book().author());
            book.setPrice(faker.number().randomDouble(2, 10, 80));
            book.setCopies(faker.number().numberBetween(2, 20));
            bookRepository.save(book);
        }
    }

    private void seedMagazines() {
        if (magazineRepository.count() > 0) {
            return;
        }

        for (int i = 0; i < 5; i++) {
            MagazineEntity magazine = new MagazineEntity();
            magazine.setTitle(faker.book().genre() + " Weekly");
            magazine.setPrice(faker.number().randomDouble(2, 5, 25));
            magazine.setCopies(faker.number().numberBetween(3, 25));
            magazine.setOrderQty(faker.number().numberBetween(5, 40));
            magazine.setCurrentIssue(LocalDateTime.now().minusDays(faker.number().numberBetween(1, 30)));
            magazineRepository.save(magazine);
        }
    }
}
