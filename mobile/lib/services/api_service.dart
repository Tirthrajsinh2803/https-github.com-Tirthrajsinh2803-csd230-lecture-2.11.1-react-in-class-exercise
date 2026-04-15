import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/product.dart';

class ApiService {
  static const String baseUrl = 'http://192.168.1.5:8080';

  static Future<List<Product>> fetchProducts() async {
    final booksResponse = await http.get(Uri.parse('$baseUrl/api/books'));
    final magazinesResponse = await http.get(Uri.parse('$baseUrl/api/magazines'));

    if (booksResponse.statusCode != 200 || magazinesResponse.statusCode != 200) {
      throw Exception('Failed to load products');
    }

    final List books = json.decode(booksResponse.body);
    final List magazines = json.decode(magazinesResponse.body);

    final mappedBooks = books.map((item) => Product(
      id: item['id'],
      title: item['title'],
      type: 'Book',
      price: ((item['pubPrice'] ?? item['price']) as num).toDouble(),
      meta: item['author'] ?? 'Author not available',
    ));

    final mappedMagazines = magazines.map((item) => Product(
      id: item['id'],
      title: item['title'],
      type: 'Magazine',
      price: ((item['pubPrice'] ?? item['price']) as num).toDouble(),
      meta: 'Qty ${item['orderQty']}',
    ));

    return [...mappedBooks, ...mappedMagazines].cast<Product>();
  }
}
