/**
 * Dashboard Controller - Returns Demo Security Data
 * 
 * This controller provides demo data for the dashboard page.
 * In a real application, this data would come from actual
 * security monitoring systems and log analysis tools.
 * 
 * For our BCA project, we use realistic-looking sample data
 * to demonstrate how a security dashboard would work.
 */

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/dashboard/stats
 * @access  Private
 */
const getStats = async (req, res) => {
  try {
    // Demo statistics data - simulates real security metrics
    const stats = {
      totalUsers: 156,
      activesessions: 23,
      blockedAttempts: 47,
      securityScore: 85,
      lastUpdated: new Date().toISOString()
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
};

/**
 * @desc    Get fake login attempt logs (demo data)
 * @route   GET /api/dashboard/logs
 * @access  Private
 */
const getLogs = async (req, res) => {
  try {
    // Demo login attempt logs - simulates security monitoring
    const logs = [
      {
        id: 1,
        action: 'Login Success',
        email: 'admin@example.com',
        ip: '192.168.1.105',
        location: 'Mumbai, India',
        timestamp: '2024-03-15 09:23:41',
        status: 'success'
      },
      {
        id: 2,
        action: 'Login Failed',
        email: 'unknown@hacker.com',
        ip: '45.33.32.156',
        location: 'Unknown',
        timestamp: '2024-03-15 09:15:22',
        status: 'failed'
      },
      {
        id: 3,
        action: 'Brute Force Blocked',
        email: 'test@test.com',
        ip: '185.220.101.34',
        location: 'Tor Exit Node',
        timestamp: '2024-03-15 08:45:10',
        status: 'blocked'
      },
      {
        id: 4,
        action: 'Login Success',
        email: 'student@bca.edu',
        ip: '192.168.1.42',
        location: 'Delhi, India',
        timestamp: '2024-03-15 08:30:55',
        status: 'success'
      },
      {
        id: 5,
        action: 'XSS Attempt Blocked',
        email: 'attacker@malicious.com',
        ip: '103.21.244.0',
        location: 'Unknown',
        timestamp: '2024-03-15 07:55:33',
        status: 'blocked'
      },
      {
        id: 6,
        action: 'Password Reset',
        email: 'user@company.com',
        ip: '192.168.1.78',
        location: 'Bangalore, India',
        timestamp: '2024-03-15 07:12:18',
        status: 'success'
      },
      {
        id: 7,
        action: 'Login Failed',
        email: 'admin@example.com',
        ip: '91.240.118.172',
        location: 'Russia',
        timestamp: '2024-03-14 23:45:09',
        status: 'failed'
      },
      {
        id: 8,
        action: 'SQL Injection Blocked',
        email: "' OR 1=1 --",
        ip: '177.54.150.200',
        location: 'Brazil',
        timestamp: '2024-03-14 22:30:44',
        status: 'blocked'
      }
    ];

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching security logs' });
  }
};

/**
 * @desc    Get security tips
 * @route   GET /api/dashboard/tips
 * @access  Private
 */
const getTips = async (req, res) => {
  try {
    const tips = [
      {
        id: 1,
        title: 'Use Strong Passwords',
        description: 'Mix uppercase, lowercase, numbers, and special characters. Minimum 12 characters recommended.',
        icon: '🔑'
      },
      {
        id: 2,
        title: 'Enable 2FA',
        description: 'Two-factor authentication adds an extra layer of security beyond just a password.',
        icon: '🛡️'
      },
      {
        id: 3,
        title: 'Beware of Phishing',
        description: 'Never click suspicious links or provide credentials on untrusted websites.',
        icon: '🎣'
      },
      {
        id: 4,
        title: 'Keep Software Updated',
        description: 'Updates patch known security vulnerabilities that attackers exploit.',
        icon: '🔄'
      },
      {
        id: 5,
        title: 'Sanitize User Input',
        description: 'Always validate and sanitize data from users to prevent XSS and injection attacks.',
        icon: '🧹'
      },
      {
        id: 6,
        title: 'Use HTTPS',
        description: 'Encrypt data in transit to prevent man-in-the-middle attacks.',
        icon: '🔒'
      }
    ];

    res.json(tips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching security tips' });
  }
};

module.exports = { getStats, getLogs, getTips };
