using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace FootTourCA
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            ResizeMode = ResizeMode.CanMinimize;
        }

        private void TxtEmail_GotFocus(object sender, RoutedEventArgs e)
        {
            if (TxtEmail.Foreground == Brushes.Gray)
            {
                TxtEmail.Text = "";
                TxtEmail.Foreground = Brushes.Black; 
            }
        }

        private void TxtEmail_LostFocus(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(TxtEmail.Text))
            {
                TxtEmail.Text = "valaki@valahol.hu";
                TxtEmail.Foreground = Brushes.Gray;
            }
        }

        private void PwdPwd_GotFocus(object sender, RoutedEventArgs e)
        {
            if (PwdPwd.Foreground == Brushes.Gray)
            {
                PwdPwd.Password = "";
                PwdPwd.Foreground = Brushes.Black;
            }
        }

        private void PwdPwd_LostFocus(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(PwdPwd.Password))
            {
                PwdPwd.Password = "jelszó";
                PwdPwd.Foreground = Brushes.Gray;
            }
        }

        private void BtnLogin_Click(object sender, RoutedEventArgs e)
        {
            if (AllFieldsOk())
            {
                new Dashboard().Show();
                Close();
            }
            else
                MessageBox.Show("Helytelen adatok!", "Figyelem!", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        private bool AllFieldsOk()
        {
            if (!string.IsNullOrWhiteSpace(TxtEmail.Text) && !string.IsNullOrWhiteSpace(PwdPwd.Password) && TxtEmail.Foreground != Brushes.Gray && PwdPwd.Foreground != Brushes.Gray)
                return true;
            return false;
        }

        private void LblRegister_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = "http://localhost:4200/register",
                UseShellExecute= true
            });
        }
    }
}
