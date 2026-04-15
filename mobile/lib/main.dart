import 'package:flutter/material.dart';
import 'services/api_service.dart';
import 'models/product.dart';

void main() {
  runApp(const Lab8MobileApp());
}

class Lab8MobileApp extends StatelessWidget {
  const Lab8MobileApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Lab 8 Mobile',
      theme: ThemeData(useMaterial3: true, colorSchemeSeed: Colors.indigo),
      home: const ProductListPage(),
    );
  }
}

class ProductListPage extends StatelessWidget {
  const ProductListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Bookstore Mobile')),
      body: FutureBuilder<List<Product>>(
        future: ApiService.fetchProducts(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }
          final products = snapshot.data ?? [];
          return ListView.builder(
            itemCount: products.length,
            itemBuilder: (context, index) {
              final product = products[index];
              return Card(
                margin: const EdgeInsets.all(12),
                child: ListTile(
                  title: Text(product.title),
                  subtitle: Text('${product.type} • \$${product.price.toStringAsFixed(2)}'),
                  trailing: Text(product.meta),
                ),
              );
            },
          );
        },
      ),
    );
  }
}
