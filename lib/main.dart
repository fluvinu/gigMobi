import 'package:flutter/material.dart';

void main() {
  runApp(const GigMobiApp());
}

class GigMobiApp extends StatelessWidget {
  const GigMobiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'gigMobi',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF276EF1)),
        scaffoldBackgroundColor: const Color(0xFFF5F7FB),
        useMaterial3: true,
      ),
      home: const GigHomePage(),
    );
  }
}

enum GigCategory { travel, plumber, walker, delivery, other }
enum GigStatus { open, inProgress, completed }

class Gig {
  Gig({
    required this.id,
    required this.title,
    required this.description,
    required this.budget,
    required this.city,
    required this.category,
    required this.status,
  });

  final String id;
  final String title;
  final String description;
  final double budget;
  final String city;
  final GigCategory category;
  GigStatus status;
}

class GigHomePage extends StatefulWidget {
  const GigHomePage({super.key});

  @override
  State<GigHomePage> createState() => _GigHomePageState();
}

class _GigHomePageState extends State<GigHomePage> {
  int _selectedIndex = 0;

  final List<Gig> _gigs = [
    Gig(
      id: 'g1',
      title: 'Airport drop at 7 PM',
      description: 'Need a cab from downtown to airport.',
      budget: 35,
      city: 'Austin',
      category: GigCategory.travel,
      status: GigStatus.open,
    ),
    Gig(
      id: 'g2',
      title: 'Kitchen sink leakage fix',
      description: 'Plumber needed for quick repair this evening.',
      budget: 55,
      city: 'Austin',
      category: GigCategory.plumber,
      status: GigStatus.inProgress,
    ),
    Gig(
      id: 'g3',
      title: 'Pick up parcel and deliver',
      description: 'Walk and deliver a small package across 1.5 miles.',
      budget: 22,
      city: 'Austin',
      category: GigCategory.walker,
      status: GigStatus.open,
    ),
  ];

  void _takeGig(String id) {
    setState(() {
      final gig = _gigs.firstWhere((item) => item.id == id);
      gig.status = GigStatus.inProgress;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Gig accepted and moved to In Progress')),
    );
  }

  void _createGig({
    required String title,
    required String description,
    required double budget,
    required String city,
    required GigCategory category,
  }) {
    setState(() {
      _gigs.insert(
        0,
        Gig(
          id: DateTime.now().millisecondsSinceEpoch.toString(),
          title: title,
          description: description,
          budget: budget,
          city: city,
          category: category,
          status: GigStatus.open,
        ),
      );
      _selectedIndex = 0;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Gig created successfully')),
    );
  }

  @override
  Widget build(BuildContext context) {
    final openCount = _gigs.where((g) => g.status == GigStatus.open).length;

    final pages = [
      HomeScreen(gigs: _gigs, onTakeGig: _takeGig),
      CreateGigScreen(onCreateGig: _createGig),
      WalletScreen(gigs: _gigs),
    ];

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: const Text('gigMobi'),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16),
            child: Center(
              child: Text('$openCount open gigs'),
            ),
          ),
        ],
      ),
      body: pages[_selectedIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) => setState(() => _selectedIndex = index),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), label: 'Home'),
          NavigationDestination(icon: Icon(Icons.add_box_outlined), label: 'Post Gig'),
          NavigationDestination(icon: Icon(Icons.account_balance_wallet_outlined), label: 'Wallet'),
        ],
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({
    required this.gigs,
    required this.onTakeGig,
    super.key,
  });

  final List<Gig> gigs;
  final void Function(String id) onTakeGig;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: gigs.length,
      itemBuilder: (context, index) {
        final gig = gigs[index];
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        gig.title,
                        style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                    ),
                    Text(
                      '\$${gig.budget.toStringAsFixed(0)}',
                      style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF276EF1)),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text('${gig.city} • ${_labelForCategory(gig.category)} • ${_labelForStatus(gig.status)}'),
                const SizedBox(height: 8),
                Text(gig.description),
                if (gig.status == GigStatus.open) ...[
                  const SizedBox(height: 12),
                  FilledButton(
                    onPressed: () => onTakeGig(gig.id),
                    child: const Text('Take Gig'),
                  ),
                ],
              ],
            ),
          ),
        );
      },
    );
  }
}

class CreateGigScreen extends StatefulWidget {
  const CreateGigScreen({required this.onCreateGig, super.key});

  final void Function({
    String title,
    String description,
    double budget,
    String city,
    GigCategory category,
  }) onCreateGig;

  @override
  State<CreateGigScreen> createState() => _CreateGigScreenState();
}

class _CreateGigScreenState extends State<CreateGigScreen> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _budgetController = TextEditingController();
  final _cityController = TextEditingController(text: 'Austin');

  GigCategory _selectedCategory = GigCategory.other;

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    _budgetController.dispose();
    _cityController.dispose();
    super.dispose();
  }

  void _submit() {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    widget.onCreateGig(
      title: _titleController.text.trim(),
      description: _descriptionController.text.trim(),
      budget: double.parse(_budgetController.text.trim()),
      city: _cityController.text.trim(),
      category: _selectedCategory,
    );

    _titleController.clear();
    _descriptionController.clear();
    _budgetController.clear();
    setState(() {
      _selectedCategory = GigCategory.other;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextFormField(
              controller: _titleController,
              decoration: const InputDecoration(labelText: 'Gig title'),
              validator: (value) => (value == null || value.trim().length < 3) ? 'Enter at least 3 characters' : null,
            ),
            const SizedBox(height: 10),
            TextFormField(
              controller: _descriptionController,
              maxLines: 3,
              decoration: const InputDecoration(labelText: 'Description'),
              validator: (value) =>
                  (value == null || value.trim().length < 7) ? 'Enter at least 7 characters' : null,
            ),
            const SizedBox(height: 10),
            TextFormField(
              controller: _budgetController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Budget (USD)'),
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Enter budget';
                }
                final number = double.tryParse(value.trim());
                if (number == null || number <= 0) {
                  return 'Enter valid budget';
                }
                return null;
              },
            ),
            const SizedBox(height: 10),
            TextFormField(
              controller: _cityController,
              decoration: const InputDecoration(labelText: 'City'),
              validator: (value) => (value == null || value.trim().isEmpty) ? 'Enter city' : null,
            ),
            const SizedBox(height: 14),
            DropdownButtonFormField<GigCategory>(
              value: _selectedCategory,
              items: GigCategory.values
                  .map(
                    (category) => DropdownMenuItem(
                      value: category,
                      child: Text(_labelForCategory(category)),
                    ),
                  )
                  .toList(),
              onChanged: (value) {
                if (value != null) {
                  setState(() {
                    _selectedCategory = value;
                  });
                }
              },
              decoration: const InputDecoration(labelText: 'Category'),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              child: FilledButton(
                onPressed: _submit,
                child: const Text('Publish Gig'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class WalletScreen extends StatelessWidget {
  const WalletScreen({required this.gigs, super.key});

  final List<Gig> gigs;

  @override
  Widget build(BuildContext context) {
    final totalValue = gigs.fold<double>(0, (sum, gig) => sum + gig.budget);
    final estimatedMargin = totalValue * 0.15;
    final inProgress = gigs.where((gig) => gig.status == GigStatus.inProgress).length;
    final completed = gigs.where((gig) => gig.status == GigStatus.completed).length;

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _MetricCard(label: 'Total Gig Value', value: '\$${totalValue.toStringAsFixed(2)}'),
        _MetricCard(label: 'Estimated Platform Margin (15%)', value: '\$${estimatedMargin.toStringAsFixed(2)}'),
        Row(
          children: [
            Expanded(child: _MetricCard(label: 'In Progress', value: '$inProgress')),
            const SizedBox(width: 12),
            Expanded(child: _MetricCard(label: 'Completed', value: '$completed')),
          ],
        ),
      ],
    );
  }
}

class _MetricCard extends StatelessWidget {
  const _MetricCard({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label),
            const SizedBox(height: 6),
            Text(
              value,
              style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),
    );
  }
}

String _labelForCategory(GigCategory category) {
  switch (category) {
    case GigCategory.travel:
      return 'Travel';
    case GigCategory.plumber:
      return 'Plumber';
    case GigCategory.walker:
      return 'Walker';
    case GigCategory.delivery:
      return 'Delivery';
    case GigCategory.other:
      return 'Other';
  }
}

String _labelForStatus(GigStatus status) {
  switch (status) {
    case GigStatus.open:
      return 'Open';
    case GigStatus.inProgress:
      return 'In Progress';
    case GigStatus.completed:
      return 'Completed';
  }
}
